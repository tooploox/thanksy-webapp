import { reducer, initialState, splitThxLists, actions } from "./store"
import { thxFixture } from "../test/fixtures"

describe("counter state", () => {
    describe("reducer", () => {
        it("gives same state when unknown action is given", () =>
            expect(reducer(initialState.app, { type: "fake" })).toEqual(initialState.app))

        describe("Notifications", () => {
            it("creates notification when setThxListFailed is dispatched", () => {
                const action = actions.updateThxListFail(new Error("foo"))
                const rstate: AppState = (reducer(initialState.app, action) as any)[0]
                expect(rstate.notifications.length).toEqual(1)
                expect(rstate.notifications[0].text).toEqual("Server connection problem")
            })

            it("removes notification with `id` when clearNotification is dispatched", () => {
                const n1 = { notificationId: "1", text: "foo" }
                const n2 = { notificationId: "2", text: "bar" }
                const state = { ...initialState.app, notifications: [n1, n2] }
                const action = actions.clearNotification(n1.notificationId)
                const rstate: AppState = reducer(state, action) as any
                expect(rstate.notifications).toEqual([n2])
            })
        })
    })

    describe("splitThxList()", () => {
        const t1 = thxFixture({ id: 1 })
        const t2 = thxFixture({ id: 2 })
        const t3 = thxFixture({ id: 3 })

        it("Gives only thxList when all ids are <= than lastThxId", () =>
            expect(splitThxLists([t1, t2], 2)).toEqual({ recentThxList: [], thxList: [t2, t1], lastThxId: 2 }))

        it("Gives only recentThxList when all ids are > than lastThxId", () =>
            expect(splitThxLists([t2, t3], 1)).toEqual({ recentThxList: [t2, t3], thxList: [], lastThxId: 1 }))

        it("Gives both list filtered", () =>
            expect(splitThxLists([t1, t2, t3], 2)).toEqual({ recentThxList: [t3], thxList: [t2, t1], lastThxId: 2 }))

        it("Gives everything as thxList when thxListId is not set (-1)", () =>
            expect(splitThxLists([t1, t2, t3], -1)).toEqual({ recentThxList: [], thxList: [t3, t2, t1], lastThxId: 3 }))

        it("Gives sorted recentThxList", () =>
            expect(splitThxLists([t2, t1, t3], 0)).toEqual({ recentThxList: [t1, t2, t3], thxList: [], lastThxId: 0 }))
    })
})
