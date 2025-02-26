<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Event;
use App\Models\Tag;
use App\Models\User;

class DashboardController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'totalPost' => Post::count() ?? 0,
            'totalEvent' => Event::count() ?? 0,
            'totalTag' => Tag::count() ?? 0,
            'totalUser' => User::count() ?? 0,
        ]);
    }
}
