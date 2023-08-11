import ClientArise from "src/pages/client/arise/ClientArise";
import ClientAsset from "src/pages/client/asset/ClientAsset";
import { ClientBill } from "src/pages/client/bill/ClientBill";
import ClientContract from "src/pages/client/contract/ClientContract";
import Notification from "src/pages/client/notification/Notification/notification";
import { ClientInfomation } from "src/pages/client/information/ClientInfomation";
import ClientService from "src/pages/client/service/ClientService";
import { urlRouter } from "src/utils/constants";
import { Clientchangepassword } from "src/pages/client/changePassword/ClientChangepassword"

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
    },
    {
        path: urlRouter.CLIENT_CHANGEPASSWORD,
        component: Clientchangepassword,
    }

]
