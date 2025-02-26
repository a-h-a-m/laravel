<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RekapController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\PhotoController;
use App\Http\Controllers\Admin\VideoController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\UserController;

Route::get('/', function(){
    return Auth::check() ? Redirect::route('admin.dashboard.index') : Redirect::route('login');
});

Auth::routes(['register' => false]);

Route::middleware('auth')->group(function(){
    Route::inertia('/whatsapp', 'Dashboard/Whatsapp')->name('whatsapp');
    Route::inertia('/admin/coba', 'Rekap/Test')->name('admin.coba');
    Route::post('/caption', [RekapController::class, 'postCaption']);
    Route::get('/caption', [RekapController::class, 'caption'])->name('admin.rekap.caption');
    Route::post('/selesai', [RekapController::class, 'finish']);
});

Route::prefix('admin')->group(function(){
    Route::group(['middleware' => 'auth'], function(){
        //dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard.index');
        //rekap
        Route::resource('/rekap', RekapController::class, ['except' => 'show', 'as' => 'admin']);
        //permissions
        Route::resource('/permission', PermissionController::class, ['except' => ['show', 'create', 'edit', 'update', 'delete'], 'as' => 'admin']);
        //roles
        Route::resource('/role', RoleController::class, ['except' => 'show', 'as' => 'admin']);
        //users
        Route::resource('/user', UserController::class, ['except' => 'show', 'as' => 'admin']);
        //tags
        Route::resource('/tag', TagController::class, ['except' => 'show', 'as' => 'admin']);
        //categories
        Route::resource('/category', CategoryController::class, ['except' => 'show', 'as' => 'admin']);
        //posts
        Route::resource('/post', PostController::class, ['except' => 'show', 'as' => 'admin']);
        //events
        Route::resource('/event', EventController::class, ['except' => 'show', 'as' => 'admin']);
        //photos
        Route::resource('/photo', PhotoController::class, ['except' => ['show', 'create', 'edit', 'update'], 'as' => 'admin']);
        //videos
        Route::resource('/video', VideoController::class, ['except' => 'show', 'as' => 'admin']);
        //sliders
        Route::resource('/slider', SliderController::class, ['except' => ['show', 'create', 'edit', 'update'], 'as' => 'admin']);
    });
});
