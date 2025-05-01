import axios from "axios";
import roomRenderData from "../src/lib/mapData/roomRenderData";
import { components, paths } from "../src/lib/types/apiTypes";
import "../src/lib/types/mapTypes.d.ts";

const API_URL = "https://brshapi.com/rooms";

async function verifyRoomData() {
  try {
    console.log("Fetching room data from the API...");
    const response = await axios.get<
      paths["/rooms"]["get"]["responses"]["200"]["content"]["application/json"]
    >(API_URL);
    const apiRoomData = response.data;
    console.log("API data fetched successfully.");

    // Create maps for both data sources with room.name as keys
    const apiRoomMap = new Map<string, components["schemas"]["RoomEntity"]>();
    apiRoomData.forEach((room) => {
      apiRoomMap.set(room.name, room);
    });

    const renderRoomMap = new Map<string, RoomRenderItem>();
    roomRenderData.forEach((room) => {
      renderRoomMap.set(room.name, room);
    });

    console.log("Data transformed into maps for comparison.");

    // Check 1: Verify all render data entries have matching API entries
    console.log("\nVerifying render data against API data:");
    let allRenderEntriesHaveApiMatch = true;
    for (const [renderName] of renderRoomMap.entries()) {
      if (apiRoomMap.has(renderName)) {
        console.log(`✅ Found matching API data for '${renderName}'.`);
      } else {
        console.warn(`❌ No matching API data found for '${renderName}'.`);
        allRenderEntriesHaveApiMatch = false;
      }
    }

    // Check 2: Verify all API entries have matching render data entries
    console.log("\nVerifying API data against render data:");
    let allApiEntriesHaveRenderMatch = true;
    for (const [apiName] of apiRoomMap.entries()) {
      if (renderRoomMap.has(apiName)) {
        console.log(`✅ Found matching render data for '${apiName}'.`);
      } else {
        console.warn(`❌ No matching render data found for '${apiName}'.`);
        allApiEntriesHaveRenderMatch = false;
      }
    }

    // Final summary
    console.log("\n--- VERIFICATION SUMMARY ---");
    if (allRenderEntriesHaveApiMatch) {
      console.log(
        "✅ All entries in roomRenderData have matching API entries."
      );
    } else {
      console.warn(
        "⚠️ Some entries in roomRenderData are missing in API data."
      );
    }

    if (allApiEntriesHaveRenderMatch) {
      console.log("✅ All API entries have matching roomRenderData entries.");
    } else {
      console.warn("⚠️ Some API entries are missing in roomRenderData.");
    }

    if (allRenderEntriesHaveApiMatch && allApiEntriesHaveRenderMatch) {
      console.log(
        "🎉 Perfect match! All data is synchronized between API and render data."
      );
    }
  } catch (error: unknown) {
    console.error("Error fetching or processing data:", error);
  }
}

// Run the verification function
await verifyRoomData();
