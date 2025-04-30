import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnalysisService } from '../services/analysis.service';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private analysisService: AnalysisService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      analysis: this.fb.array([]),
      patientId: ['', [Validators.pattern("^[0-9]*$")]],
      startDate: [null],
      endDate: [null],
      analysisCode: [null]
    }, { updateOn: 'blur' });
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  get analysisArray() {
    return this.form.get('analysis') as FormArray;
  }

  async search() {
    if (this.form.invalid)
      return

    var id = this.form.get('patientId').value
    var startDate = this.form.get('startDate').value
    var endDate = this.form.get('endDate').value
    var code = this.form.get('analysisCode').value
    var page = 1

    var arr = await firstValueFrom(
      this.analysisService
        .getData(id, startDate, endDate, code, page)
        .pipe(takeUntil(this.destroy$))
    )

    this.analysisArray.clear();

    arr.data.forEach((item) => {
      const group = this.fb.group({
        patientId: [{ value: item.patientId || '', disabled: true }],
        analysisDate: [{ value: item.analysisDate || '', disabled: true }],
        analysisCode: [{ value: item.analysisCode || '', disabled: true }],
        result: [{ value: item.result || '', disabled: true }]
      })

      this.analysisArray.push(group)
    })
  }

  async delAnalysis(index: number) {
    let analysis = this.analysisArray.at(index)

    await firstValueFrom(
      this.analysisService
        .delAnalysis(analysis.get('patientId').value, analysis.get('analysisDate').value, analysis.get('analysisCode').value)
        .pipe(takeUntil(this.destroy$))
    )

    this.search()
  }

  formatDateTime(dateString: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      console.error('Error formatting date', e);
      return dateString; // возвращаем как есть, если не удалось распарсить
    }
  }
}
