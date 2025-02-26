<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Slider;
use App\Traits\HasPagination;

class SliderController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['permission:sliders.index|sliders.create|sliders.delete']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sliders = Slider::latest()->when(request()->q, function($sliders) {
            $sliders = $sliders->where('title', 'like', '%'. request()->q . '%');
        })->paginate(10);

        $elements = $this->elements($sliders);

        return Inertia::render('Slider/Index', [
            'sliders' => $sliders,
            'elements' => $elements,
            'hasPages' => $sliders->hasPages(),
            'isFirstPage' => $sliders->onFirstPage(),
            'hasMorePages' => $sliders->hasMorePages(),
        ]);
    }
}
