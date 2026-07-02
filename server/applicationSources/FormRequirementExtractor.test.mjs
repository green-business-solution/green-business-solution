import { describe, expect, it } from "vitest";
import { extractFormRequirementsFromHtml } from "./FormRequirementExtractor.mjs";

describe("FormRequirementExtractor", () => {
  it("extracts Vermont Gas required and optional interest-form fields", () => {
    const result = extractFormRequirementsFromHtml(
      `
        <form>
          <label>Name *</label>
          <label>Property Address *</label>
          <label>Do you own the property? *</label>
          <label>Are you a VGS customer? *</label>
          <label>VGS Account Number</label>
          <label>Daytime Phone Number *</label>
          <label>Email Address *</label>
          <label>What products are you interested in? *</label>
          <label>What type of heating equipment? *</label>
          <label>Who is your Electric provider? *</label>
          <label>What type of water heater? *</label>
          <label>How old is your current water heater?</label>
          <label>How do you currently heat your hot water?</label>
          <label>Does your electric panel require an upgrade? *</label>
          <label>Are you currently working with an electrician? *</label>
          <label>How do you heat your home? *</label>
          <label>Is your furnace located in a basement? *</label>
          <label>Furnace Make and Model</label>
          <label>Dwelling Type *</label>
          <label>Income qualification question *</label>
          <label>How did you hear about this program? *</label>
          <label>Electric panel photo</label>
          <label>Furnace photo</label>
          <label>CAPTCHA</label>
          <label>Please enter a valid email address to configure Zoho Sign settings</label>
        </form>
      `,
      { sourceUrl: "https://vgsvt.com/savings/equipment-leases/interest-form/" }
    );

    const requiredIds = result.requiredFields.map((item) => item.id);
    expect(requiredIds).toEqual(expect.arrayContaining([
      "name",
      "property_address",
      "property_ownership_authorization",
      "vgs_customer_status",
      "daytime_phone_number",
      "email_address",
      "products_interested_in",
      "heating_equipment_type",
      "electric_provider",
      "water_heater_type",
      "electric_panel_upgrade_status",
      "currently_working_with_electrician",
      "home_heating_method",
      "furnace_in_basement",
      "dwelling_type",
      "income_qualification_question",
      "how_heard_about_program"
    ]));
    expect(result.optionalFields.map((item) => item.id)).toEqual(expect.arrayContaining([
      "vgs_account_number",
      "water_heater_age",
      "current_hot_water_fuel",
      "furnace_make_model",
      "electric_panel_photo",
      "furnace_photo"
    ]));
    expect(JSON.stringify(result)).not.toMatch(/captcha|zoho sign|support@zohoforms/i);
  });
});
