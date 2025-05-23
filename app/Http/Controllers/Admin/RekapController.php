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
use PhpOffice\PhpSpreadsheet\Reader\Xlsx as R;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx as W;

class RekapController extends Controller
{
    use HasPagination;
    private $testData = [];
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

    public function download()
    {
        $bulan = getBulanSebelum($_GET['b']);
        $spreadsheet = (new R())->load(__DIR__ . '/../../../../public/template-baru.xlsx');
        $value = $spreadsheet->getActiveSheet()->setCellValue('C1', $bulan);
        $writer = new W($spreadsheet);
        $writer->save(__DIR__ . '/../../../../public/template-baru.xlsx');
    }

    public function create()
    {
        $this->download();
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
        $values = [];
        foreach($capaian as $k => $v)
            $values[] = [
                'key' => $k,
                'value' => $v ?? '',
            ];
        
        $templateProcessor->cloneRowAndSetValues('key', $values);
        $t = date('Y');
        $templateProcessor->saveAs(__DIR__ . "/../../../../public/files/{$dt->bulan}-{$t}-{$dt->id}.docx");
    }
    }

    private function generatePdf($data)
    {
        foreach($data as $dt) {
        ConvertApi::setApiCredentials('secret_oMXBFSnIq2xJTMhV');
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
        $testing = $request->input('test');
        $isTest = ($testing=='true');
        $this->validate($request, [
            'file' => 'required|mimes:csv,xls,xlsx'
        ]);

        $file = $request->file('file');
        $namaFile = $file->hashName();
        $file->storeAs('public/excel', $namaFile);

        Excel::import(new RekapImport($request->input('bulan'), $request->input('tahun'), ($isTest)), Storage::path('public/excel/'.$namaFile));
        if($isTest) {
            $testData = RekapImport::$testData;
            $rekap = [];
            foreach($testData as $td) {
                $temp = new Rekap();
                $temp->id = mt_rand(1000000000, 9999999999);
                foreach($td as $key => $value)
                    $temp->$key = $value;
                $rekap[] = $temp;
            }
            $this->generateFiles($rekap);
            $this->generatePdf($rekap);
            
            return redirect()->route('admin.coba')->with(['testing' => $rekap, 'bulan' => $request->input('bulan')]);
        }

        $rekap = Rekap::where('bulan', $request->input('bulan'))
            ->where('tahun_pelajaran', $request->input('tahun'))
            ->get();

        $this->generateFiles($rekap);
        $this->generatePdf($rekap);

        return redirect()->route('admin.rekap.index')->with(['success' => 'Data Berhasil Disimpan!', 'bulan' => $request->input('bulan')]);
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
