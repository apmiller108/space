import { expect } from "chai";
import sinon from "sinon";
import { actions } from "@/store/modules/ships";
import shipsApi from "@/services/spacex/shipsApi";

describe("ships", () => {
  describe("actions", () => {
    describe("getShips", () => {
      const { getShips } = actions;
      const commit = sinon.spy();

      describe("when ships exist", () => {
        const getters = { all: [{ id: "ship1" }] };

        it("does not make an API call to get ships", () => {
          const spy = sinon.spy(shipsApi, "getAll");
          getShips({ commit, getters });
          expect(spy.notCalled).to.be.true;
          spy.restore();
        });
      });

      describe("where there are no ships", () => {
        const getters = { all: [] };
        const apiResponse = {
          status: 200,
          data: [{ id: "ship1" }]
        };

        beforeEach(() => {
          sinon.stub(shipsApi, "getAll").resolves(apiResponse);
        });

        afterEach(() => {
          sinon.restoreObject(shipsApi);
        });

        it("sets the error to null", () => {
          getShips({ commit, getters });
          expect(commit.calledWith("setError"), null).to.be.true;
        });

        it("sets the loading to true", () => {
          getShips({ commit, getters });
          expect(commit.calledWith("setLoading"), null).to.be.true;
        });

        describe("with a success response", () => {
          it("commits the ships", async () => {
            await getShips({ commit, getters });
            expect(commit.calledWith("setAll", apiResponse.data));
          });
        });

        describe("with an error response", () => {
          it("commits the error object", async () => {
            const error = { status: 500 };
            sinon.restoreObject(shipsApi);
            sinon.stub(shipsApi, "getAll").rejects(error);
            try {
              await getShips({ commit, getters });
            } catch (error) {
              expect(commit.calledWith("setError", error));
            }
          });
        });
      });
    });
  });
});
