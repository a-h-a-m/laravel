<?php
namespace App\Traits;

use Illuminate\Pagination\UrlWindow;

trait HasPagination {
    protected function elements($paginator) {
        $window = UrlWindow::make($paginator);
        return array_filter([
            $window['first'],
            is_array($window['slider']) ? '...' : null,
            $window['slider'],
            is_array($window['last']) ? '...' : null,
            $window['last'],
        ]);
    }
}