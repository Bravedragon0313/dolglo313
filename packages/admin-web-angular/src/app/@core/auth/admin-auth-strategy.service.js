var AdminAuthStrategy_1;
import { __awaiter, __decorate, __metadata } from "tslib";
import { Observable, from, of } from 'rxjs';
import { NbAuthResult, NbAuthStrategy } from '@nebular/auth';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '../data/store.service';
import { getDummyImage } from '@modules/server.common/utils';
let AdminAuthStrategy = AdminAuthStrategy_1 = class AdminAuthStrategy extends NbAuthStrategy {
    constructor(apollo, route, store) {
        super();
        this.apollo = apollo;
        this.route = route;
        this.store = store;
    }
    static setup(options) {
        return [AdminAuthStrategy_1, options];
    }
    getByEmail(email) {
        return this.apollo
            .query({
            query: gql `
					query GetAdminByEmail($email: String!) {
						adminByEmail(email: $email) {
							_id
						}
					}
				`,
            variables: { email },
        })
            .pipe(map((res) => res.data['adminByEmail']));
    }
    authenticate(args) {
        const { email, password } = args;
        const rememberMe = !!args.rememberMe;
        const Login = gql `
			mutation Login($email: String!, $password: String!) {
				adminLogin(email: $email, password: $password) {
					token
					admin {
						_id
						id
						email
						name
						pictureUrl
					}
				}
			}
		`;
        return this.apollo
            .mutate({
            mutation: Login,
            variables: {
                email,
                password,
            },
            errorPolicy: 'all',
        })
            .pipe(map((res) => {
            const { data, errors } = res;
            const isSuccessful = !!data.adminLogin;
            if (errors) {
                return new NbAuthResult(false, res, AdminAuthStrategy_1.config.login.redirect.failure, errors.map((err) => JSON.stringify(err)));
            }
            if (!isSuccessful) {
                return new NbAuthResult(false, res, AdminAuthStrategy_1.config.login.redirect.failure, AdminAuthStrategy_1.config.login.defaultErrors);
            }
            this.store.adminId = data.adminLogin.admin.id;
            this.store.token = data.adminLogin.token;
            return new NbAuthResult(isSuccessful, res, AdminAuthStrategy_1.config.login.redirect.success, [], AdminAuthStrategy_1.config.logout.defaultMessages);
        }), catchError((err) => {
            console.error(err);
            return of(new NbAuthResult(false, err, AdminAuthStrategy_1.config.login.defaultErrors, [AdminAuthStrategy_1.config.logout.defaultErrors]));
        }));
    }
    register(args) {
        const { email, fullName, password, confirmPassword, terms } = args;
        if (password !== confirmPassword) {
            return Observable.of(new NbAuthResult(false, null, null, [
                "The passwords don't match.",
            ]));
        }
        const letter = fullName.charAt(0).toUpperCase();
        const pictureUrl = getDummyImage(300, 300, letter);
        const mutation = gql `
			mutation Register(
				$email: String!
				$fullName: String!
				$pictureUrl: String!
				$password: String!
			) {
				registerAdmin(
					registerInput: {
						admin: {
							email: $email
							name: $fullName
							pictureUrl: $pictureUrl
						}
						password: $password
					}
				) {
					_id
					id
					email
					pictureUrl
				}
			}
		`;
        return this.apollo
            .mutate({
            mutation,
            variables: {
                email,
                fullName,
                password,
                pictureUrl,
            },
            errorPolicy: 'all',
        })
            .pipe(map((res) => {
            const { data, errors } = res;
            const admin = data.registerAdmin;
            if (errors) {
                return new NbAuthResult(false, res, AdminAuthStrategy_1.config.register.redirect.failure, errors.map((err) => JSON.stringify(err)));
            }
            return new NbAuthResult(true, res, AdminAuthStrategy_1.config.register.redirect.success, [], AdminAuthStrategy_1.config.register.defaultMessages);
        }), catchError((err) => {
            console.error(err);
            return of(new NbAuthResult(false, err, AdminAuthStrategy_1.config.register.defaultErrors, [AdminAuthStrategy_1.config.logout.defaultErrors]));
        }));
    }
    logout() {
        return from(this._logout());
    }
    requestPassword(data) {
        throw new Error('Not implemented yet');
    }
    resetPassword(data = {}) {
        throw new Error('Not implemented yet');
    }
    refreshToken(data) {
        throw new Error('Not implemented yet');
    }
    _logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.clear();
            this.store.serverConnection = '200';
            yield this.apollo.getClient().resetStore();
            return new NbAuthResult(true, null, AdminAuthStrategy_1.config.logout.redirect.success, [], AdminAuthStrategy_1.config.logout.defaultMessages);
        });
    }
};
AdminAuthStrategy.config = {
    login: {
        redirect: {
            success: '/',
            failure: null,
        },
        defaultErrors: [
            'Login/Email combination is not correct, please try again.',
        ],
        defaultMessages: ['You have been successfully logged in.'],
    },
    register: {
        redirect: {
            success: '/',
            failure: null,
        },
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: ['You have been successfully registered.'],
    },
    logout: {
        redirect: {
            success: '/',
            failure: null,
        },
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: ['You have been successfully logged out.'],
    },
    requestPass: {
        redirect: {
            success: '/',
            failure: null,
        },
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: [
            'Reset password instructions have been sent to your email.',
        ],
    },
    resetPass: {
        redirect: {
            success: '/',
            failure: null,
        },
        resetPasswordTokenKey: 'reset_password_token',
        defaultErrors: ['Something went wrong, please try again.'],
        defaultMessages: ['Your password has been successfully changed.'],
    },
};
AdminAuthStrategy = AdminAuthStrategy_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo,
        ActivatedRoute,
        Store])
], AdminAuthStrategy);
export { AdminAuthStrategy };
//# sourceMappingURL=admin-auth-strategy.service.js.map