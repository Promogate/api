import { verifyToken } from "@/application/middlewares";
import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

const uploadRouter = Router();

const upload = multer({ dest: "./public" });

function createDestinationFolder(destinationPath: string) {
  if (!checkDestinationFolder(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }
  return;
}

function checkDestinationFolder(destinationPath: string) {
  if(!fs.existsSync(destinationPath)) {
    return false;
  }
  const stats = fs.statSync(destinationPath);
  return stats.isDirectory();
}

function moveFileToDestination(file: Express.Multer.File, destinationPath: string) {
  const destination = path.join(destinationPath, file.originalname);
  fs.renameSync(file.path, destination);
}

uploadRouter.get("/:storeName/:fileName", (req, res) => {
  const { storeName, fileName } = req.params as { storeName: string, fileName: string };
  return res.sendFile(path.resolve(`public/${storeName}/${fileName}`));
});

uploadRouter.use(verifyToken);

uploadRouter.post("/:storeName", upload.single("file"), (req, res) => {
  const file = req.file;
  const { storeName } = req.params as { storeName: string };

  try {
    createDestinationFolder("public/" + storeName);

    if (!file) throw new Error("Arquivo não identificado");

    moveFileToDestination(file, "public/" + storeName);

  } catch (error) {
    throw new Error("Falha ao fazer upload");
  }

  return res.send("Arquivo recebido com sucesso!");
});

export { uploadRouter };
