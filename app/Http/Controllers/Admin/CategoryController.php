<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Traits\HasPagination;

class CategoryController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['permission:categories.index|categories.create|categories.edit|sliders.delete']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::latest()->when(request()->q, function($categories) {
            $categories = $categories->where('name', 'like', '%'. request()->q . '%');
        })->paginate(10);

        $elements = $this->elements($categories);

        return Inertia::render('Category/Index', [
            'categories' => $categories,
            'elements' => $elements,
            'hasPages' => $categories->hasPages(),
            'isFirstPage' => $categories->onFirstPage(),
            'hasMorePages' => $categories->hasMorePages(),
        ]);
    }
}
