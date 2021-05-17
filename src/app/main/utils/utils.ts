export default class Utils {

  static setForm(form: any, data: any) {
    Object.keys(form.controls).forEach((field) => {
      form.patchValue({
        [field]: data[field]
      });
    })
  }
}