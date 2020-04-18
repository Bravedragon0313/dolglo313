import { NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';
export class NbEverRoleProvider extends NbRoleProvider {
    getRole() {
        return observableOf('guest');
    }
}
//# sourceMappingURL=roleProvider.js.map