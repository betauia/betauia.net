# Setup of nginx

Add `betauia.net` to `/etc/nginx/sites-available/` and create symlink for it to `etc/nginx/sites-enabled/`:
```bash
sudo ln -s /etc/nginx/sites-available/betauia.net /etc/nginx/sites-enabled/
```

Check if syntax and config is good:
```bash
sudo nginx -t
```

Restart nginx service:
```bash
sudo systemctl restart nginx
```

(For HTTPS) Make certbot manage SSL:
```bash
sudo certbot --nginx -d betauia.net -d www.betauia.net -d api.betauia.net
```
