import { FormControl } from '@angular/forms';

export function uuidValidator(control: FormControl) {
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!UUID_REGEX.test(control.value)) {
        return { uuid: true };
    }
    return null;
}