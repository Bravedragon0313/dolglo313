import { filter } from 'lodash';
import OrderStatus from '@modules/server.common/enums/OrderStatus';
import OrderWarehouseStatus from '@modules/server.common/enums/OrderWarehouseStatus';
export const ordersFilter = (orders, mode) => {
    return filter(orders, (order) => {
        switch (mode) {
            case 'ready':
                return (order.status === OrderStatus.WarehousePreparation ||
                    (order.status === OrderStatus.InDelivery &&
                        order.warehouseStatus ===
                            OrderWarehouseStatus.PackagingFinished));
            case 'in_delivery':
                return order.status === OrderStatus.InDelivery;
            case 'not_confirmed':
                return (!order.isConfirmed &&
                    !order.isCancelled &&
                    !order.isCompleted);
            case 'cancelled':
                return order.isCancelled;
            case 'all':
            default:
                return true;
        }
    });
};
//# sourceMappingURL=ordersFilter.js.map