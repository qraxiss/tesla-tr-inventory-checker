sudo cp conf.nginx /etc/nginx/sites-available/api.nestjs-app-template.qraxiss.com

sudo ln -s /etc/nginx/sites-available/api.nestjs-app-template.qraxiss.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx