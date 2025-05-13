<?php

if (! function_exists('setActive')) {    
    
    /**
     * setActive
     *
     * @param  mixed $path
     * @return void
     */
    function setActive($path)
    {
        return Request::is($path . '*') ? ' active' :  '';
    }

}

if (! function_exists('TanggalID')) {         
    
    /**
     * TanggalID
     *
     * @param  mixed $tanggal
     * @return void
     */
    function TanggalID($tanggal) {
        $value = Carbon\Carbon::parse($tanggal);
        $parse = $value->locale('id');
        return $parse->translatedFormat('l, d F Y');
    }
}

if (! function_exists('getBulanSebelum')) {         
    
    function getBulanSebelum($bulan) {
        $bulanArray = ['Januari' => 'Desember', 'Februari' => 'Januari', 'Maret' => 'Februari', 'April' => 'Maret', 'Mei' => 'April', 'Juni' => 'Mei', 'Juli' => 'Juni', 'Agustus' => 'Juli', 'September' => 'Agustus', 'Oktober' => 'September', 'November' => 'Oktober', 'Desember' => 'November'];
        return $bulanArray[$bulan];
    }
}