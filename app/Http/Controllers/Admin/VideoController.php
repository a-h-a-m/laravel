<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Video;
use App\Traits\HasPagination;

class VideoController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['permission:videos.index|videos.create|videos.edit|videos.delete']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $videos = Video::latest()->when(request()->q, function($videos) {
            $videos = $videos->where('name', 'like', '%'. request()->q . '%');
        })->paginate(10);

        $elements = $this->elements($videos);

        return Inertia::render('Video/Index', [
            'videos' => $videos,
            'elements' => $elements,
            'hasPages' => $videos->hasPages(),
            'isFirstPage' => $videos->onFirstPage(),
            'hasMorePages' => $videos->hasMorePages(),
        ]);
    }
}
