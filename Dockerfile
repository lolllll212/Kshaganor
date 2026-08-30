FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html about.html services.html industries.html contact.html 404.html robots.txt /usr/share/caddy/
COPY css /usr/share/caddy/css
COPY js /usr/share/caddy/js
COPY images /usr/share/caddy/images

ENV PORT=8080
EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
