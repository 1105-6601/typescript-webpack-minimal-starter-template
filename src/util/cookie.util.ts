export default class CookieUtil
{
  public static read(key: string): string
  {
    if (!key || !this.has(key)) {
      return null;
    }

    return decodeURIComponent(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'));
  }

  public static write(key: string, value: string, path: string = '/', end: any = Infinity, domain?: string, secure?: boolean): void
  {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
      return;
    }

    let sExpires = '';

    if (end) {
      switch (end.constructor) {
        case Number:
          sExpires = end === Infinity ? '; expires=Tue, 19 Jan 2038 03:14:07 GMT' : '; max-age=' + end;
          break;
        case String:
          sExpires = '; expires=' + end;
          break;
        case Date:
          sExpires = '; expires=' + end.toGMTString();
          break;
      }
    }

    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + sExpires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');
  }

  public static remove(key: string, path: string = '/'): void
  {
    if (!key || !this.has(key)) {
      return;
    }

    document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (path ? '; path=' + path : '');
  }

  public static has(key: string): boolean
  {
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
  }
}