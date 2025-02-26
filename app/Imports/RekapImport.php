<?php

namespace App\Imports;

use App\Models\Rekap;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class RekapImport implements ToModel, WithHeadingRow
{
    private $bulan, $tahun;

    public function __construct(string $bulan, string $tahun)
    {
        $this->bulan = $bulan;
        $this->tahun = $tahun;
    }

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        if(!isset($row['nama_santri']))
            return;
        return new Rekap([
            'nama' => $row['nama_santri'],
            'kelas' => $row['kelas'],
            'tahun_pelajaran' => $this->tahun,
            'bulan' => $this->bulan,
            'values' => json_encode([
                'Ziyadah' => $row['ziyadah'],
                'Total Juz yang telah disetorkan' => $row['total'],
                'Juz Ujian Al-Qur\'an Bulanan' => $row['juz_ujian_bulanan'],
            ]),
            'wa' => isset($row['no_whatsapp_2_jika_ada']) ? json_encode([
                    'wa1' => $row['no_whatsapp_1'], 
                    'wa2' => $row['no_whatsapp_2_jika_ada']
                ]) : $row['no_whatsapp_1'],
            'status' => 'Belum dikirim',
        ]);
    }
}
