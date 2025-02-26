<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use App\Traits\HasPagination;

class PermissionController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['permission:permissions.index']);
    }

    /**
     * function index
     *
     * @return void
     */
    public function index()
    {
        $permissions = Permission::latest()->when(request()->q, function($permissions) {
            $permissions = $permissions->where('name', 'like', '%'. request()->q . '%');
        })->paginate(5);

        $elements = $this->elements($permissions);

        return Inertia::render('Permission/Index', [
            'permissions' => $permissions,
            'elements' => $elements,
            'hasPages' => $permissions->hasPages(),
            'isFirstPage' => $permissions->onFirstPage(),
            'hasMorePages' => $permissions->hasMorePages(),
        ]);
    }
}
