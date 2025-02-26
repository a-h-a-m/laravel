<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Traits\HasPagination;

class EventController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['permission:events.index|events.create|events.edit|events.delete']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::latest()->when(request()->q, function($events) {
            $events = $events->where('title', 'like', '%'. request()->q . '%');
        })->paginate(10);

        $elements = $this->elements($events);

        return Inertia::render('Event/Index', [
            'events' => $events,
            'elements' => $elements,
            'hasPages' => $events->hasPages(),
            'isFirstPage' => $events->onFirstPage(),
            'hasMorePages' => $events->hasMorePages(),
        ]);
    }
}
