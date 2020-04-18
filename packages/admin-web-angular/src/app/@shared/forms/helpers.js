import { FormArray, FormGroup } from '@angular/forms';
import { capitalize } from 'lodash';
export class FormHelpers {
    static deepMark(formGroup, markAs, opts = { onlySelf: false }) {
        Object.values(formGroup.controls).map((c) => {
            if (c instanceof FormGroup || c instanceof FormArray) {
                FormHelpers.deepMark(c, markAs, opts);
            }
            else {
                c[`markAs${capitalize(markAs)}`](opts);
            }
        });
    }
}
//# sourceMappingURL=helpers.js.map