import { db } from "../src/utils/db.server";

type Author = {
    firstName: string;
    lasName: string;
};

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

async function seed() {
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lasName
                }
            })
        })
    );
    const author = await db.author.findFirst({
        where: {
            firstName: "Yuval Noah"
        }
    });

    await Promise.all(
        getBooks().map((book) => {
            const {title, isFiction, datePublished } = book;
            return db.book.create(
               {
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId : author.id
                } 
               });
        })
    );
}

seed();

function getAuthors(): Array<Author> {
    return[
        {
            firstName: "john",
            lasName: "Doe"
        },
        {
            firstName: "Willoam",
            lasName: "Shakespeare",
        },
        {
            firstName: "Yuval Noah",
            lasName: "Harari",
        }
    ];
}

function getBooks(): Array<Book> {
    return [ 
        {
            title: "Sapiens",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "Homo Deus",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "The Ugly Ducking",
            isFiction: true,
            datePublished: new Date(),
        }
    ]
}