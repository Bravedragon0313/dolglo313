import { __awaiter, __decorate, __metadata } from "tslib";
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { map, share } from 'rxjs/operators';
import { getCountryName } from '@modules/server.common/entities/GeoLocation';
import { countries } from '@modules/server.common/data/abbreviation-to-country';
let InvitesService = class InvitesService {
    constructor(apollo) {
        this.apollo = apollo;
        this.invites$ = this.apollo
            .watchQuery({
            query: gql `
				query allInvites {
					invites {
						id
						code
						geoLocation {
							city
							streetAddress
							house
							countryId
							loc {
								coordinates
								type
							}
						}
						apartment
					}
				}
			`,
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data.invites), share());
    }
    getAllInvitesRequests() {
        return this.invites$;
    }
    getInvites(pagingOptions) {
        return this.apollo
            .watchQuery({
            query: gql `
					query AllInvites($pagingOptions: PagingOptionsInput) {
						invites(pagingOptions: $pagingOptions) {
							id
							code
							geoLocation {
								city
								streetAddress
								house
								countryId
								loc {
									coordinates
									type
								}
							}
							apartment
						}
					}
				`,
            variables: { pagingOptions },
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data.invites), share());
    }
    createInvite(createInput) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation CreateInvite($createInput: InviteCreateInput!) {
						createInvite(createInput: $createInput) {
							id
						}
					}
				`,
            variables: {
                createInput,
            },
        })
            .pipe(map((result) => result.data.createInvite), share());
    }
    removeByIds(ids) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation RemoveInvitesByIds($ids: [String!]!) {
						removeInvitesByIds(ids: $ids) {
							n
						}
					}
				`,
            variables: { ids },
        })
            .pipe(map((result) => result.data.removeInvitesByIds), share());
    }
    updateInvite(id, updateInput) {
        return this.apollo
            .mutate({
            mutation: gql `
					mutation UpdateInvite(
						$id: String!
						$updateInput: InviteUpdateInput!
					) {
						updateInvite(id: $id, updateInput: $updateInput) {
							id
						}
					}
				`,
            variables: {
                id,
                updateInput,
            },
        })
            .pipe(map((result) => result.data.updateInvite), share());
    }
    getCreateInviteObject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._tryFindNewAddress(data.house, data.address, data.city, Object.values(countries).indexOf(data.country));
            const lat = Number(res['lat']).toFixed(7);
            const lng = Number(res['lng']).toFixed(7);
            const geoLocation = {
                countryId: Object.values(countries).indexOf(data.country),
                city: data.city,
                streetAddress: data.address,
                house: data.house,
                loc: {
                    coordinates: [Number(lng), Number(lat)],
                    type: 'Point',
                },
            };
            const invite = {
                code: data.invite,
                apartment: data.apartment,
                geoLocation,
            };
            return invite;
        });
    }
    getCountOfInvites() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.apollo
                .query({
                query: gql `
					query GetCountOfInvites {
						getCountOfInvites
					}
				`,
            })
                .toPromise();
            return res.data['getCountOfInvites'];
        });
    }
    generate1000InvitesConnectedToInviteRequests(defaultLng, defaultLat) {
        return this.apollo.query({
            query: gql `
				query Generate1000InvitesConnectedToInviteRequests(
					$defaultLng: Float!
					$defaultLat: Float!
				) {
					generate1000InvitesConnectedToInviteRequests(
						defaultLng: $defaultLng
						defaultLat: $defaultLat
					)
				}
			`,
            variables: { defaultLng, defaultLat },
        });
    }
    _tryFindNewAddress(house, streetAddress, city, countryId) {
        const countryName = getCountryName(countryId);
        const geocoder = new google.maps.Geocoder();
        return new Promise((resolve, reject) => {
            geocoder.geocode({
                address: `${streetAddress} ${house}, ${city}`,
                componentRestrictions: {
                    country: countryName,
                },
            }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    const place = results[0];
                    resolve(place.geometry.location.toJSON());
                }
                else {
                    resolve({ lat: 0, lng: 0 });
                }
            });
        });
    }
};
InvitesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], InvitesService);
export { InvitesService };
//# sourceMappingURL=invites.service.js.map