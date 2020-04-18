import { __awaiter, __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, share } from 'rxjs/operators';
import gql from 'graphql-tag';
import { getCountryName } from '@modules/server.common/entities/GeoLocation';
import { countries } from '@modules/server.common/data/abbreviation-to-country';
let InvitesRequestsService = class InvitesRequestsService {
    constructor(_apollo) {
        this._apollo = _apollo;
        this.invitesRequests$ = this._apollo
            .watchQuery({
            query: gql `
				query allInvitesRequests {
					invitesRequests {
						id
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
						isInvited
						invitedDate
						apartment
					}
				}
			`,
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data.invitesRequests), share());
    }
    getAllInvitesRequests() {
        return this.invitesRequests$;
    }
    getInvitesRequests(pagingOptions, invited) {
        return this._apollo
            .watchQuery({
            query: gql `
					query AllInvitesRequests(
						$pagingOptions: PagingOptionsInput
						$invited: Boolean
					) {
						invitesRequests(
							pagingOptions: $pagingOptions
							invited: $invited
						) {
							id
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
							isInvited
							invitedDate
							apartment
						}
					}
				`,
            variables: { pagingOptions, invited },
            pollInterval: 2000,
        })
            .valueChanges.pipe(map((res) => res.data.invitesRequests), share());
    }
    createInviteRequest(createInput) {
        return this._apollo
            .mutate({
            mutation: gql `
					mutation CreateInviteRequest(
						$createInput: InviteRequestCreateInput!
					) {
						createInviteRequest(createInput: $createInput) {
							id
						}
					}
				`,
            variables: {
                createInput,
            },
        })
            .pipe(map((result) => result.data.createInviteRequest), share());
    }
    removeByIds(ids) {
        return this._apollo
            .mutate({
            mutation: gql `
					mutation RemoveInvitesRequestsByIds($ids: [String!]!) {
						removeInvitesRequestsByIds(ids: $ids) {
							n
						}
					}
				`,
            variables: { ids },
        })
            .pipe(map((result) => result.data.removeInvitesRequestsByIds), share());
    }
    updateInviteRequest(id, updateInput) {
        return this._apollo
            .mutate({
            mutation: gql `
					mutation UpdateInviteRequest(
						$id: String!
						$updateInput: InviteRequestUpdateInput!
					) {
						updateInviteRequest(
							id: $id
							updateInput: $updateInput
						) {
							id
						}
					}
				`,
            variables: {
                id,
                updateInput,
            },
        })
            .pipe(map((result) => result.data.updateInviteRequest), share());
    }
    getCreateInviteRequestObject(data) {
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
            const inviteRequest = {
                apartment: data.apartment,
                isManual: true,
                geoLocation,
            };
            return inviteRequest;
        });
    }
    generate1000InviteRequests(defaultLng, defaultLat) {
        return this._apollo.query({
            query: gql `
				query Generate1000InviteRequests(
					$defaultLng: Float!
					$defaultLat: Float!
				) {
					generate1000InviteRequests(
						defaultLng: $defaultLng
						defaultLat: $defaultLat
					)
				}
			`,
            variables: { defaultLng, defaultLat },
        });
    }
    getCountOfInvitesRequests(invited) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._apollo
                .query({
                query: gql `
					query GetCountOfInvitesRequests($invited: Boolean) {
						getCountOfInvitesRequests(invited: $invited)
					}
				`,
                variables: { invited },
            })
                .toPromise();
            return res.data['getCountOfInvitesRequests'];
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
InvitesRequestsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Apollo])
], InvitesRequestsService);
export { InvitesRequestsService };
//# sourceMappingURL=invites-requests.service.js.map