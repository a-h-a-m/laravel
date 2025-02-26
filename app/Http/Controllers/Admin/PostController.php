<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Traits\HasPagination;

class PostController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['permission:posts.index|posts.create|posts.edit|posts.delete']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::latest()->when(request()->q, function($posts) {
            $posts = $posts->where('title', 'like', '%'. request()->q . '%');
        })->paginate(10);

        $elements = $this->elements($posts);

        return Inertia::render('Post/Index', [
            'posts' => $posts,
            'elements' => $elements,
            'hasPages' => $posts->hasPages(),
            'isFirstPage' => $posts->onFirstPage(),
            'hasMorePages' => $posts->hasMorePages(),
        ]);
    }
}
