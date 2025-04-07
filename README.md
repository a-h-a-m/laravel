Aplikasi Laravel

Tutorial install
1. Clone repository
```cmd
git clone https://github.com/a-h-a-m/laravel.git nama-folder
```
2. Buat salinan file .env.example dan rename menjadi .env
3. Edit konfigurasi database di file .env (sqlite diubah ke mysql dan disesuaikan).
4. Install dependency
```cmd
composer install
```
5. Migrasi database
```cmd
php artisan migrate --seed
```
jika muncul pertanyaan untuk membuat database baru, ketik 'yes'.

6. Generate APP_KEY
```cmd
php artisan key:generate
```
7. Jalankan aplikasi
```cmd
php artisan serve
```
8. Buka http://localhost:8000 di browser
9. Login dengan nomor whatsapp '123' dan password 'test'
