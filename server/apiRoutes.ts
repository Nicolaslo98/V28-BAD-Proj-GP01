import express from "express";
import { captureRoutes } from "./captureRoutes";
import { userRoutes } from "./userRoutes";
import { roomRoutes } from "./roomRoute";
import { historyRoutes } from "./historyRoutes";
import { eplayerRoutes } from "./eplayerRoutes";
import { rankRoutes } from "./rankRoutes";
import { startRoutes } from "./startRoutes";
import { aiRoutes } from "./aiRoutes";
import { confirmFanRoutes } from "./confirmRoutes"

export const apiRoutes = express.Router();

apiRoutes.use('/camera', captureRoutes);
apiRoutes.use('/user', userRoutes);
apiRoutes.use('/room', roomRoutes)
apiRoutes.use('/history', historyRoutes);
apiRoutes.use('/eplayer', eplayerRoutes);
apiRoutes.use('/rank', rankRoutes);
apiRoutes.use('/start', startRoutes);
apiRoutes.use('/ai', aiRoutes);
apiRoutes.use('/confirmFan', confirmFanRoutes)