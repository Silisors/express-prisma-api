import  express from "express";
import type { Request, Response } from "express";
import { body, validationResult} from "express-validator";
import * as AuthorService from "./author.service";

export const authorRouter = express.Router();

authorRouter.get("/", async (request: Request, response: Response)=> {
    try {
        const authors = await AuthorService.listAuthors()
        return response.status(200).json(authors)
    } catch (error: any) {
        return response.status(500).json(error.menssage)
    }
});


// GET A SINGLE AUTHOR BY ID

authorRouter.get("/:id", async (request: Request, response: Response)=>{
    const id: number = parseInt(request.params.id, 10);
    try{
        const author = await AuthorService.getAuthor(id)
        if (author) {
            return response.status(200).json(author)
        }
        return response.status(404).json("no se pudo encontrar al autor :( .")
    } catch (error: any) {
        return response.status(500).json(error.menssage)
    }
})
//POST: CREATE A AUTHOR
//PARAMS: firstName, lastName
authorRouter.post("/", body("firstName").isString(), body("lastName").isString(), async(request: Request, response: Response)=>{
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array() });
    }
    try{
        const author = request.body 
        const newAuthor = await AuthorService.createAuthor(author)
        return response.status(201).json(newAuthor)
    } catch ( error: any) {
        return response.status(500).json(error.menssage)
    }
}
);

authorRouter.put("/:id",body("firstName").isString(), body("lastName").isString(), async(request: Request, response: Response)=>{
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array() });
    }
    const id: number= parseInt(request.params.id, 10)
    try{
        const author = request.body
        const updatedAuthor = await AuthorService.updateAuthor(author, id)
        return response.status(200).json(updatedAuthor)
    } catch (error: any) {
        return response.status(500).json(error.menssage);

    }
} 
);


authorRouter.delete("/:id", async(request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        await AuthorService.deleAuthor(id)
        return response.status(204).json("Author has been successfully deleted")
    } catch (error: any) {
        return response.status(500).json(error.menssage);
    }
})