import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Topic = {
    topic: string;
    label: string;
    type: string;
    imageUrl: string;
    nightImageUrl: string;
    relevanceTag: string;
    priority: number;
};

export type News = {
    authorName: string;
    categoryNames: string[];
    content: string;
    countryCode: string;
    createdAt: number;
    hashId: string;
    imageUrl: string;
    important: boolean;
    language: string;
    oldHashId: string;
    relevancyTags: string[];
    score: number;
    shortenedUrl: string;
    sourceName: string;
    sourceUrl: string;
    subtitle: string;
    title: string;
};

type NewsState = {
    isUserOnbaord: boolean;
    topics: Topic[];
    news: News[];
    userSelectedTopics: Topic[];
    trendingNews: News[];
    savedNews: News[];
    isNotification: boolean;
};

const initialState: NewsState = {
    isUserOnbaord: false,
    topics: [],
    news: [],
    userSelectedTopics: [],
    trendingNews: [],
    savedNews: [],
    isNotification: true,
};

const NewsSlice = createSlice({
    name: "newsSlice",
    initialState,
    reducers: {
        setUserOnboard: (state: NewsState, action: PayloadAction<boolean>) => {
            state.isUserOnbaord = action.payload;
        },
        setTopics: (state: NewsState, action: PayloadAction<Topic[]>) => {
            state.topics = action.payload;
        },
        setUserSelectedTopics: (
            state: NewsState,
            action: PayloadAction<Topic[]>
        ) => {
            state.userSelectedTopics = action.payload;
        },
        setNews: (state: NewsState, action: PayloadAction<News[]>) => {
            state.news = action.payload;
        },
        setTrendingNews: (state: NewsState, action: PayloadAction<News[]>) => {
            state.trendingNews = action.payload;
        },
        setSavedNews: (state: NewsState, action: PayloadAction<News>) => {
            state.savedNews = [...state.savedNews, action.payload];
        },
        removeNews: (state: NewsState, action: PayloadAction<News>) => {
            state.savedNews = state.savedNews.filter(
                (news: News) => news.hashId !== action.payload.hashId
            );
        },
        updateTopics: (state: NewsState, action: PayloadAction<Topic>) => {
            let tempTopics = state.userSelectedTopics;
            if(tempTopics.includes(action.payload)) {
                tempTopics = tempTopics.filter((e: Topic) => e.topic !== action.payload.topic)
                console.log(tempTopics)
            }
            console.log(tempTopics.includes(action.payload))
        },
        setIsNotification: (
            state: NewsState,
            action: PayloadAction<boolean>
        ) => {
            state.isNotification = action.payload;
        },
    },
});

export const {
    setTopics,
    setUserOnboard,
    setUserSelectedTopics,
    setNews,
    setTrendingNews,
    setSavedNews,
    removeNews,
    setIsNotification,
    updateTopics
} = NewsSlice.actions;
export default NewsSlice.reducer;
