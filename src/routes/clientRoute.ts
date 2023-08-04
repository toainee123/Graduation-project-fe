import ClientArise from "src/pages/client/arise/ClientArise";
import ClientAsset from "src/pages/client/asset/ClientAsset";
import ClientBill from "src/pages/client/bill/ClientBill";
import ClientContract from "src/pages/client/contract/ClientContract";
import ClientInfomation from "src/pages/client/information/ClientInfomation";
import Notification from "src/pages/client/notification/notification";
import ClientService from "src/pages/client/service/ClientService";
import { urlRouter } from "src/utils/constants";

export const clientRoute = [
    {
        index: true,
        path: urlRouter.CLIENT_SERVICE,
        component: ClientService,
    },
    {
        path: urlRouter.CLIENT_CONTRACT,
        component: ClientContract,
    },

    {
        path: urlRouter.CLIENT_ARISE,
        component: ClientArise,
    },

    {
        path: urlRouter.CLIENT_ASSET,
        component: ClientAsset,
    },

    {
        path: urlRouter.CLIENT_BILL,
        component: ClientBill,
    },

    {
        path: urlRouter.CLIENT_INFAORMATION,
        component: ClientInfomation,
    },
    {
        path: urlRouter.CLIENT_SENDNOTIFICATION,
        component: Notification,
    }
]
