FROM denoland/deno:debian

# Enable non-free for libttspico-utils
RUN echo "deb http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware" > /etc/apt/sources.list \
    && echo "deb http://deb.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware" >> /etc/apt/sources.list \
    && echo "deb http://deb.debian.org/debian bookworm-updates main contrib non-free non-free-firmware" >> /etc/apt/sources.list

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    libttspico-utils \
    unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy source code
COPY . .

# Build frontend
WORKDIR /app/gui/frontend
RUN deno run -A --node-modules-dir npm:vite build

# Go back to root
WORKDIR /app

# Cache backend dependencies
RUN deno cache server/server.ts

# Create temp dir for uploads
RUN mkdir -p /tmp/spg-uploads

# Expose port
EXPOSE 5555

# Run server
CMD ["deno", "run", "-A", "server/server.ts"]
