<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- <title>Dashboard &mdash; HASPI</title> -->
    <link rel="shortcut icon" href="{{ asset('assets/img/school.png') }}" type="image/x-icon">
    <!-- General CSS Files -->
    <link rel="stylesheet" href="{{ asset('assets/modules/bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/modules/fontawesome/css/all.min.css') }}">
    <!-- CSS Libraries -->
    <link rel="stylesheet" href="{{ asset('assets/modules/select2/dist/css/select2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/select2-bootstrap4.css') }}" />
    <!-- Template CSS -->
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/components.css') }}">
    <script src="{{ asset('assets/modules/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/js/sweetalert.min.js') }}"></script>
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
<body style="background: #e2e8f0">
    <div>
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <nav class="navbar navbar-expand-lg main-navbar">
                <form class="form-inline mr-auto">
                    <ul class="navbar-nav mr-3">
                        <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"><i class="fas fa-bars"></i></a></li>
                    </ul>
                </form>
                <ul class="navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
                            <img src="{{ asset('assets/img/avatar/avatar-1.png') }}" alt="image" class="rounded-circle mr-1">
                            <div class="d-sm-none d-lg-inline-block">{{ auth()->user()->name }}</div>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="{{ route('whatsapp') }}" style="cursor: pointer" class="dropdown-item has-icon text-success"><i class="fas fa-sign-in-alt"></i> Akun Whatsapp</a>
                            <a href="{{ route('logout') }}" style="cursor: pointer" onclick="event.preventDefault();document.getElementById('logout-form').submit();" class="dropdown-item has-icon text-danger"><i class="fas fa-sign-out-alt"></i> Logout</a>
                            <form action="{{ route('logout') }}" method="post" id="logout-form" style="display: none;">
                                @csrf
                            </form>
                        </div>
                    </li>
                </ul>
            </nav>
            <div class="main-sidebar sidebar-style-2">
                <aside id="sidebar-wrapper">
                    <div class="sidebar-brand">
                        <a disabled>PPTQ HASPI</a>
                    </div>
                    <div class="sidebar-brand sidebar-brand-sm">
                        <a disabled>HASPI</a>
                    </div>
                    <ul class="sidebar-menu">
                        <li class="menu-header">Main Menu</li>
                        <li class="{{ setActive('admin/dashboard') }}"><a href="{{ route('admin.dashboard.index') }}" class="nav-link"><i class="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li>
                        <li class="dropdown {{ setActive('admin/rekap') }}">
                            <a href="#" class="nav-link has-dropdown"><i class="fas fa-pen"></i><span>Rekapitulasi</span></a>
                            <ul class="dropdown-menu">
                                <li><a href="{{ route('admin.rekap.index') }}" class="nav-link"><i class="fas fa-paper-plane"></i><span>Kirim</span></a></li>
                                <li><a href="{{ route('admin.rekap.caption') }}" class="nav-link"><i class="fas fa-clone"></i><span>Template</span></a></li>
                                <li><a href="{{ route('admin.coba') }}" class="nav-link"><i class="fas fa-wrench"></i><span>Percobaan</span></a></li>
                            </ul>
                        </li>
                        @can('posts.index')
                        <li class="{{ setActive('admin/post') }}"><a href="{{ route('admin.post.index') }}" class="nav-link"><i class="fas fa-book-open"></i><span>Berita</span></a></li>
                        @endcan
                        @can('tags.index')
                        <li class="{{ setActive('admin/tag') }}"><a href="{{ route('admin.tag.index') }}" class="nav-link"><i class="fas fa-tags"></i><span>Tags</span></a></li>
                        @endcan
                        @can('categories.index')
                        <li class="{{ setActive('admin/category') }}"><a href="{{ route('admin.category.index') }}" class="nav-link"><i class="fas fa-folder"></i><span>Kategori</span></a></li>
                        @endcan
                        @can('events.index')
                        <li class="{{ setActive('admin/event') }}"><a href="{{ route('admin.event.index') }}" class="nav-link"><i class="fas fa-bell"></i><span>Agenda</span></a></li>
                        @endcan
                        @if(auth()->user()->can('photos.index') || auth()->user()->can('videos.index'))
                        <li class="menu-header">Galeri</li>
                        @endif
                        @can('photos.index')
                        <li class="{{ setActive('admin/photo') }}"><a href="{{ route('admin.photo.index') }}" class="nav-link"><i class="fas fa-image"></i><span>Foto</span></a></li>
                        @endcan
                        @can('videos.index')
                        <li class="{{ setActive('admin/video') }}"><a href="{{ route('admin.video.index') }}" class="nav-link"><i class="fas fa-video"></i><span>Video</span></a></li>
                        @endcan
                        @if(auth()->user()->can('roles.index') || auth()->user()->can('permissions.index') || auth()->user()->can('users.index'))
                        <li class="menu-header">Pengaturan</li>
                        @endif
                        @can('sliders.index')
                        <li class="{{ setActive('admin/slider') }}"><a href="{{ route('admin.slider.index') }}" class="nav-link"><i class="fas fa-laptop"></i><span>Slider</span></a></li>
                        @endcan
                        <li class="dropdown {{ setActive('admin/role'). setActive('admin/permission'). setActive('admin/user') }}">
                            @if(auth()->user()->can('roles.index') || auth()->user()->can('permissions.index') || auth()->user()->can('users.index'))
                                <a href="#" class="nav-link has-dropdown"><i class="fas fa-users"></i><span>Users
                                Management</span></a>
                            @endif
                            <ul class="dropdown-menu">
                                @can('roles.index')
                                <li class="{{ setActive('admin/role') }}"><a href="{{ route('admin.role.index') }}" class="nav-link"><i class="fas fa-unlock"></i> Roles</a></li>
                                @endcan
                                @can('permissions.index')
                                <li class="{{ setActive('admin/permission') }}"><a href="{{ route('admin.permission.index') }}" class="nav-link"><i class="fas fa-key"></i> Permissions</a></li>
                                @endcan
                                @can('users.index')
                                <li class="{{ setActive('admin/user') }}"><a href="{{ route('admin.user.index') }}" class="nav-link"><i class="fas fa-users"></i> Users</a></li>
                                @endcan
                            </ul>
                        </li>
                    </ul>
                </aside>
            </div>
            <!-- Main Content -->
            @yield('content')
            <footer class="main-footer">
                <div class="footer-left">
                    Copyright &copy; 2025 <div class="bullet"></div> PPTQ HASPI <div class="bullet"></div> All Rights Reserved.
                </div>
                <div class="footer-right"></div>
            </footer>
        </div>
    </div>
    <!-- General JS Scripts -->
    <script src="{{ asset('assets/modules/popper.js') }}"></script>
    <script src="{{ asset('assets/modules/bootstrap/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/modules/nicescroll/jquery.nicescroll.min.js') }}"></script>
    <script src="{{ asset('assets/js/stisla.js') }}"></script>
    <script src="{{ asset('assets/modules/select2/dist/js/select2.full.min.js') }}"></script>
    <!-- JS Libraies -->
    <!-- Page Specific JS File -->
    <!-- Template JS File -->
    <script src="{{ asset('assets/js/scripts.js') }}"></script>
    <script src="{{ asset('assets/js/custom.js') }}"></script>
    <script>
        //active select2
        $(document).ready(function () {
            $('select').select2({
                theme: 'bootstrap4',
                width: 'style',
            });
        });
        //flash message
        @if(session()->has('success'))
        swal({
            type: "success",
            icon: "success",
            title: "BERHASIL!",
            text: "{{ session('success') }}",
            timer: 1500,
            showConfirmButton: false,
            showCancelButton: false,
            buttons: false,
        });
        @elseif(session()->has('error'))
        swal({
            type: "error",
            icon: "error",
            title: "GAGAL!",
            text: "{{ session('error') }}",
            timer: 1500,
            showConfirmButton: false,
            showCancelButton: false,
            buttons: false,
        });
        @endif
    </script>
</body>
</html>
