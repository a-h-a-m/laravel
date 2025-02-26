<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Rekap;
use App\Traits\HasPagination;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\RekapImport;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\TemplateProcessor;
use ConvertApi\ConvertApi;

class RekapController extends Controller
{
    use HasPagination;
    /**
     * __construct
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware(['permission:rekap']);
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rekap = Rekap::oldest()->when(request()->q, function($rekap) {
            $rekap = $rekap->where('nama', 'like', '%'. request()->q . '%');
        })->paginate(count(Rekap::all()));

        $elements = $this->elements($rekap);

        return Inertia::render('Rekap/Index', [
            'rekap' => $rekap,
            'elements' => $elements,
            'hasPages' => $rekap->hasPages(),
            'isFirstPage' => $rekap->onFirstPage(),
            'hasMorePages' => $rekap->hasMorePages(),
        ]);
    }

    public function caption()
    {
        $caption = file_get_contents(public_path('caption.txt'));
        return Inertia::render('Rekap/Caption', [
            'caption' => $caption,
        ]);
    }

    public function postCaption(Request $request)
    {
        file_put_contents(public_path('caption.txt'), $request->input('caption'));
        return redirect()->route('admin.rekap.caption')->with(['success' => 'Caption Berhasil Disimpan!']);
    }

    public function create()
    {
        return Inertia::render('Rekap/Create');
    }

    private function generateFiles($data)
    {
        foreach($data as $dt) {
        $templateProcessor = new TemplateProcessor(__DIR__ . '/../../../../public/template.docx');
        $templateProcessor->setValue('nama', $dt->nama);
        $templateProcessor->setValue('kelas', $dt->kelas);
        $templateProcessor->setValue('bulan', strtoupper($dt->bulan));
        $templateProcessor->setValue('tahun', date('Y'));
        
        $capaian = json_decode($dt->values, true);
        
        $values = [
            [
                'key' => 'Ziyadah',
                'value' => $capaian['Ziyadah'] ?? 'Gagal',
            ],
            [
                'key' => 'Total Juz yang telah disetorkan',
                'value' => $capaian['Total Juz yang telah disetorkan'] ?? 'Gagal',
            ],
            [
                'key' => 'Juz Ujian Al-Qur\'an Bulanan',
                'value' => $capaian['Juz Ujian Al-Qur\'an Bulanan'] ?? 'Gagal',
            ],
        ];
        
        $templateProcessor->cloneRowAndSetValues('key', $values);
        $t = date('Y');
        $templateProcessor->saveAs(__DIR__ . "/../../../../public/files/{$dt->bulan}-{$t}-{$dt->id}.docx");
    }
    }

    private function generatePdf($data)
    {
        foreach($data as $dt) {
        ConvertApi::setApiCredentials('secret_SA9SV0l1pYfLVdQU');
        $t = date('Y');
        $result = ConvertApi::convert('pdf', [
            'File' => __DIR__ . "/../../../../public/files/{$dt->bulan}-{$t}-{$dt->id}.docx",
        ], 'docx'
        );
        $result->saveFiles(__DIR__ . "/../../../../public/files/{$dt->bulan}-{$t}-{$dt->id}.pdf");
    }
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:csv,xls,xlsx'
        ]);

        $file = $request->file('file');
        $namaFile = $file->hashName();
        $file->storeAs('public/excel', $namaFile);

        Excel::import(new RekapImport($request->input('bulan'), $request->input('tahun')), Storage::path('public/excel/'.$namaFile));
        $rekap = Rekap::where('bulan', $request->input('bulan'))
            ->where('tahun_pelajaran', $request->input('tahun'))
            ->get();

        $this->generateFiles($rekap);
        $this->generatePdf($rekap);

        return redirect()->route('admin.rekap.index')->with(['success' => 'Data Berhasil Disimpan!']);
    }

    public function update(Request $request, Rekap $rekap)
    {
        $status = $rekap->status;
        $rekap = Rekap::findOrFail($rekap->id);

        $rekap->update([
            'status' => $status,
        ]);
    }

    public function finish(Request $request, Rekap $rekap)
    {
        $data = json_decode($request->input('data'), true);
        foreach($data as $dt) {
            $rekap->id = $dt['id'];
            $rekap->status = $dt['status'];
            $this->update($request, $rekap);
        }
    }
}
