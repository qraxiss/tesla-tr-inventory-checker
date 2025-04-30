sudo cp conf.nginx /etc/nginx/sites-available/api.tesla-tr-inventory-checker.qraxiss.com

sudo ln -s /etc/nginx/sites-available/api.tesla-tr-inventory-checker.qraxiss.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx