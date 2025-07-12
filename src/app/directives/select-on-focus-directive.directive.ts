import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: 'input[type="date"]:not([no-auto-copy])' // Измененный селектор
})
export class SelectOnFocusDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent) {
    this.copyFormattedDate();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // Для мобильных устройств и Safari
    this.copyFormattedDate();
  }

  private copyFormattedDate() {
    const value = this.el.nativeElement.value;
    if (!value) {
      console.warn('No date value to copy');
      return;
    }
    
    try {
      const formattedDate = this.formatDate(value);
      this.copyToClipboard(formattedDate);
      this.showCopyIndicator();
    } catch (error) {
      console.error('Error copying date:', error);
    }
  }

  private formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  }

  private copyToClipboard(text: string): void {    
    // Создаем временный элемент для копирования
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (!successful) {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      // Попробуем современный метод
      navigator.clipboard.writeText(text).catch(clipboardErr => {
        console.error('Modern clipboard API error:', clipboardErr);
      });
    } finally {
      document.body.removeChild(textArea);
    }
  }

  private showCopyIndicator(): void {
    // Сохраняем оригинальные стили
    const originalBorder = this.el.nativeElement.style.border;
    const originalBoxShadow = this.el.nativeElement.style.boxShadow;
    
    // Применяем стили
    this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid #4CAF50');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0 8px rgba(76, 175, 80, 0.6)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
    
    // Возвращаем оригинальные стили
    setTimeout(() => {
      this.renderer.setStyle(this.el.nativeElement, 'border', originalBorder);
      this.renderer.setStyle(this.el.nativeElement, 'box-shadow', originalBoxShadow);
    }, 1000);
  }
}