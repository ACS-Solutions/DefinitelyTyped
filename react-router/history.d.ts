// Type definitions for history v2.0.0
// Project: https://github.com/rackt/history
// Definitions by: Sergey Buturlakin <http://github.com/sergey-buturlakin>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare namespace HistoryModule {

    // types based on https://github.com/rackt/history/blob/master/docs/Terms.md

    type Action = string

    type CreateHistory<T> = (options?: HistoryOptions) => T

    type CreateHistoryEnhancer<T, E> = (createHistory: CreateHistory<T>) => CreateHistory<T & E>

    interface History {
        listenBefore(hook: TransitionHook): Function
        listen(listener: LocationListener): Function
        transitionTo(location: Location): void
        push(location: Location | Pathname | Path): void
        replace(location: Location | Pathname | Path): void
        go(n: number): void
        goBack(): void
        goForward(): void
        createKey(): LocationKey
        createPath(location: Location | Pathname | Path): Path
        createHref(location: Location | Pathname | Path): Href
        createLocation(location: Location | Pathname | Path, action?: Action, key?: LocationKey): Location

        /** @deprecated use location.key to save state instead */
        setState(state: LocationState): void
        /** @deprecated use listenBefore instead */
        registerTransitionHook(hook: TransitionHook): void
        /** @deprecated use the callback returned from listenBefore instead */
        unregisterTransitionHook(hook: TransitionHook): void
        /** @deprecated use push instead */
        pushState(state: LocationState, path: Path): void
        /** @deprecated use replace instead */
        replaceState(state: LocationState, path: Path): void
    }

    type HistoryOptions = Object

    type Href = string

    interface Location {
        pathname: Pathname
        search: QueryString
        query: Query
        state: LocationState
        action: Action
        key: LocationKey
    }

    type LocationKey = string

    type LocationListener = (location: Location) => void

    type LocationState = Object

    type Path = string // Pathname + QueryString

    type Pathname = string

    type Query = Object

    type QueryString = string

    type TransitionHook = (location: Location, callback: Function) => any


    type BeforeUnloadHook = () => string | boolean

    interface HistoryBeforeUnload {
        listenBeforeUnload(hook: BeforeUnloadHook): Function
    }

    interface HistoryQueries {
        /** @deprecated use push instead */
        pushState(state: LocationState, pathname: Pathname | Path, query?: Query): void
        /** @deprecated use replace instead */
        replaceState(state: LocationState, pathname: Pathname | Path, query?: Query): void
        /** @deprecated the query argument to createPath is deprecated; use a location descriptor instead */
        createPath(path: Path, query?: Query): Path
        /** @depercated the query argument to createHref is deprecated; use a location descriptor instead */
        createHref(path: Path, query?: Query): Href
    }


    // Global usage, without modules, needs the small trick, because lib.d.ts
    // already has `history` and `History` global definitions:
    // var createHistory = ((window as any).History as HistoryModule.Module).createHistory;
    interface Module {
        createHistory: CreateHistory<History>
        createHashHistory: CreateHistory<History>
        createMemoryHistory: CreateHistory<History>
        /** @deprecated Using createLocation without a history instance is deprecated; please use history.createLocation instead */
        createLocation(path?: Path, state?: LocationState, action?: Action, key?: LocationKey): Location
        useBasename<T>(createHistory: CreateHistory<T>): CreateHistory<T>
        useBeforeUnload<T>(createHistory: CreateHistory<T>): CreateHistory<T & HistoryBeforeUnload>
        useQueries<T>(createHistory: CreateHistory<T>): CreateHistory<T & HistoryQueries>
        actions: {
            PUSH: string
            REPLACE: string
            POP: string
        }
    }

}


declare module "history/lib/createBrowserHistory" {

    export default function createBrowserHistory(options?: HistoryModule.HistoryOptions): HistoryModule.History

}


declare module "history/lib/createHashHistory" {

    export default function createHashHistory(options?: HistoryModule.HistoryOptions): HistoryModule.History

}


declare module "history/lib/createMemoryHistory" {

    export default function createMemoryHistory(options?: HistoryModule.HistoryOptions): HistoryModule.History

}


declare module "history/lib/createLocation" {

    /** @deprecated Using createLocation without a history instance is deprecated; please use history.createLocation instead */
    export default function createLocation(path?: HistoryModule.Path, state?: HistoryModule.LocationState, action?: HistoryModule.Action, key?: HistoryModule.LocationKey): HistoryModule.Location

}


declare module "history/lib/useBasename" {

    export default function useBasename<T>(createHistory: HistoryModule.CreateHistory<T>): HistoryModule.CreateHistory<T>

}


declare module "history/lib/useBeforeUnload" {

    export default function useBeforeUnload<T>(createHistory: HistoryModule.CreateHistory<T>): HistoryModule.CreateHistory<T & HistoryModule.HistoryBeforeUnload>

}


declare module "history/lib/useQueries" {

    export default function useQueries<T>(createHistory: HistoryModule.CreateHistory<T>): HistoryModule.CreateHistory<T & HistoryModule.HistoryQueries>

}


declare module "history/lib/actions" {

    export const PUSH: string

    export const REPLACE: string

    export const POP: string

    export default {
        PUSH,
        REPLACE,
        POP
    }

}


declare module "history" {

    export { default as createHistory } from "history/lib/createBrowserHistory"

    export { default as createHashHistory } from "history/lib/createHashHistory"

    export { default as createMemoryHistory } from "history/lib/createMemoryHistory"

    export { default as createLocation } from "history/lib/createLocation"

    export { default as useBasename } from "history/lib/useBasename"

    export { default as useBeforeUnload } from "history/lib/useBeforeUnload"

    export { default as useQueries } from "history/lib/useQueries"

    import * as Actions from "history/lib/actions"

    export { Actions }

}
