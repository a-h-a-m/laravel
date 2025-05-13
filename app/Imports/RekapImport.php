<?php

namespace App\Imports;

use App\Models\Rekap;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class RekapImport implements ToModel, WithHeadingRow
{
    private $bulan, $bulanLalu, $tahun, $testing;
    public static $testData = [];

    public function __construct(string $bulan, string $tahun, bool $testing)
    {
        $this->bulan = $bulan;
        $this->bulanLalu = getBulanSebelum($bulan);
        $this->tahun = $tahun;
        $this->testing = $testing;
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
        $data = [
            'nama' => $row['nama_santri'],
            'kelas' => $row['kelas'],
            'tahun_pelajaran' => $this->tahun,
            'bulan' => $this->bulan,
            'values' => json_encode([
                $this->bulanLalu => $row[strtolower($this->bulanLalu)],
                'Hasil Tasmi\'' => $row['hasil_tasmi'],
                'Catatan' => $row['catatan'],
                'Kitabah' => $row['kitabah'],
                'Ujian Imror' => $row['ujian_imror'],
                'Ujian Dzikir' => $row['ujian_dzikir'],
                'Hasil Akhir' => $row['hasil_akhir'],
                'Tasmi\' Mutqin' => $row['tasmi_mutqin'],
            ]),
            'wa' => isset($row['no_whatsapp_2_jika_ada']) ? json_encode([
                    'wa1' => $row['no_whatsapp_1'], 
                    'wa2' => $row['no_whatsapp_2_jika_ada']
                ]) : $row['no_whatsapp_1'],
            'status' => 'Belum dikirim',
            ];
        if($this->testing)
            self::$testData[] = $data;
        else
            return new Rekap($data);
    }
}
