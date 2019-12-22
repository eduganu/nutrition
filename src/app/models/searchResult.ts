import { Food } from './food';

export class SearchResult {

    foodSearchCriteria: {
        generalSearchInput: string,
        pageNumber: number,
        requireAllWords: boolean
    } = undefined;
    totalHits:number  = undefined;
    currentPage:number  = undefined;
    totalPages:number = undefined;
    foods:Food[] = undefined;
}