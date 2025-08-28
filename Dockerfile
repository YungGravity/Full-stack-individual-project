# Use lightweight nginx image
FROM nginx:alpine

# Copy all project files into nginx webroot
COPY ./ /usr/share/nginx/html