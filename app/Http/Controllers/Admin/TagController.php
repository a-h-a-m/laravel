<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tag;
use App\Traits\HasPagination;

class TagController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['permission:tags.index|tags.create|tags.edit|tags.delete']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tag::latest()->when(request()->q, function($tags) {
            $tags = $tags->where('name', 'like', '%'. request()->q . '%');
        })->paginate(10);

        $elements = $this->elements($tags);

        return Inertia::render('Tag/Index', [
            'tags' => $tags,
            'elements' => $elements,
            'hasPages' => $tags->hasPages(),
            'isFirstPage' => $tags->onFirstPage(),
            'hasMorePages' => $tags->hasMorePages(),
        ]);
    }
}
