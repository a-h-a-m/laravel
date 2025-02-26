<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Photo;
use App\Traits\HasPagination;

class PhotoController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['permission:photos.index|photos.create|photos.delete']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $photos = Photo::latest()->when(request()->q, function($photos) {
            $photos = $photos->where('title', 'like', '%'. request()->q . '%');
        })->paginate(10);

        $elements = $this->elements($photos);

        return Inertia::render('Photo/Index', [
            'photos' => $photos,
            'elements' => $elements,
            'hasPages' => $photos->hasPages(),
            'isFirstPage' => $photos->onFirstPage(),
            'hasMorePages' => $photos->hasMorePages(),
        ]);
    }
}
