/*!
 * Copyright 2010 - 2016 Pentaho Corporation.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
  "pentaho/lang/Event",
  "pentaho/visual/base/events/WillSelect",
  "tests/pentaho/util/errorMatch"
], function(Event, WillSelect, errorMatch) {
  "use strict";

  /* global describe:false, it:false, expect:false, beforeEach:false */

  describe("pentaho.visual.base.events.WillSelect -", function() {
    var type = "select";

    it("should extend Event", function() {
      expect(WillSelect.prototype instanceof Event).toBe(true);
    });

    it("static property type should return full type name", function() {
      expect(WillSelect.type).toBe("will:" + type);
    });

    it("static property type should be read-only", function() {
      expect(function() {
        WillSelect.type = "New Name";
      }).toThrowError(TypeError);
    });

    describe("instances -", function() {
      var event;

      var filter = {};
      var mode = function() {};

      beforeEach(function() {
        event = new WillSelect({}, filter, mode);
      });

      it("should extend Event", function() {
        expect(event instanceof Event).toBe(true);
      });

      it("dataFilter property should be the same than received in the constructor", function() {
        expect(event.dataFilter).toBe(filter);
      });

      it("selectionMode property should be the same than received in the constructor", function() {
        expect(event.selectionMode).toBe(mode);
      });

      it("dataFilter property should not be immutable", function() {
        var newFilter = "other";

        expect(function() {
          event.dataFilter = newFilter;
        }).not.toThrow();

        expect(event.dataFilter).toBe(newFilter);
      });

      it("selectionMode property should only accept functions", function() {
        var newMode = "no function";

        expect(function() {
          event.selectionMode = newMode;
        }).toThrow(errorMatch.argInvalidType("selectionMode", "function", "string"));

        newMode = function otherFunction() {};

        event.selectionMode = newMode;

        expect(event.selectionMode).not.toBe(mode);
        expect(event.selectionMode).toBe(newMode);
      });
    });

    it("should throw if selectionMode parameter is not a function", function() {
      expect(function() {
        return new WillSelect({}, {}, "no function");
      }).toThrow(errorMatch.argInvalidType("selectionMode", "function", "string"));
    });

  }); // #pentaho.visual.base.eventsWillSelect
});
