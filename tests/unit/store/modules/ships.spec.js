import { expect } from "chai";
import { mutations } from "@/store/modules/ships";

describe("ships", () => {
  describe("mutations", () => {
    const state = {
      all: [],
      selected: null,
      error: null,
      loading: false
    };

    describe("setAll", () => {
      const { setAll } = mutations;
      const ships = [{ ship_id: 1 }];

      it("sets the 'all' property", () => {
        setAll(state, ships);
        expect(state.all).to.equal(ships);
      });
    });
  });
});
