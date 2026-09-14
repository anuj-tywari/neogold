import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateDatabaseSchema1621234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Users table
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "email",
            type: "varchar",
            length: "150",
            isNullable: true,
          },
          {
            name: "phone_no",
            type: "varchar",
            length: "20",
          },
          {
            name: "password",
            type: "varchar",
            length: "100",
          },
          {
            name: "status",
            type: "tinyint",
            default: 0,
          },
          {
            name: "type",
            type: "tinyint",
            default: 0,
          },
          {
            name: "email_verified",
            type: "tinyint",
            default: 0,
          },
          {
            name: "phone_verified",
            type: "tinyint",
            default: 0,
          },
          {
            name: "email_token",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "sms_token",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dob",
            type: "date",
            isNullable: true,
          },
          {
            name: "lang_preference",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "partner_ref_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_users_email",
            columnNames: ["email"],
          },
          {
            name: "IDX_users_phone_no",
            columnNames: ["phone_no"],
          },
          {
            name: "IDX_users_email_token",
            columnNames: ["email_token"],
          },
          {
            name: "IDX_users_sms_token",
            columnNames: ["sms_token"],
          },
        ],
      }),
      true
    );

    // Create User Details table
    await queryRunner.createTable(
      new Table({
        name: "user_details",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "gold_balance",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "address_line1",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "address_line2",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "pincode",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "state",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_user_details_user_id",
            columnNames: ["user_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Roles table
    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Create Permissions table
    await queryRunner.createTable(
      new Table({
        name: "permissions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "pagename",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
      true
    );

    // Create Role Permissions table
    await queryRunner.createTable(
      new Table({
        name: "role_permissions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "role_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "permission_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
        indices: [
          {
            name: "IDX_role_permissions_role_id",
            columnNames: ["role_id"],
          },
          {
            name: "IDX_role_permissions_permission_id",
            columnNames: ["permission_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["permission_id"],
            referencedTableName: "permissions",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create User Permissions table
    await queryRunner.createTable(
      new Table({
        name: "user_permissions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "role_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "vendor_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
        indices: [
          {
            name: "IDX_user_permissions_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_user_permissions_role_id",
            columnNames: ["role_id"],
          },
          {
            name: "IDX_user_permissions_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["role_id"],
            referencedTableName: "roles",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create KYC table
    await queryRunner.createTable(
      new Table({
        name: "kyc",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "first_name",
            type: "varchar",
            length: "50",
          },
          {
            name: "last_name",
            type: "varchar",
            length: "50",
          },
          {
            name: "dob",
            type: "date",
          },
          {
            name: "pan",
            type: "varchar",
            length: "20",
          },
          {
            name: "pin_code",
            type: "varchar",
            length: "30",
            isNullable: true,
          },
          {
            name: "is_identity",
            type: "boolean",
            default: false,
          },
          {
            name: "is_pan",
            type: "boolean",
            default: false,
          },
          {
            name: "unique_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "identity_no",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "pan_no",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_kyc_user_id",
            columnNames: ["user_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create KYC Documents table
    await queryRunner.createTable(
      new Table({
        name: "kyc_documents",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "type",
            type: "varchar",
            length: "60",
          },
          {
            name: "document_name",
            type: "text",
          },
          {
            name: "file_id",
            type: "int",
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "verify_by_admin_1",
            type: "boolean",
            default: false,
          },
          {
            name: "verify_by_admin_2",
            type: "boolean",
            default: false,
          },
          {
            name: "comments",
            type: "text",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_kyc_documents_user_id",
            columnNames: ["user_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Files table
    await queryRunner.createTable(
      new Table({
        name: "files",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "link",
            type: "varchar",
            length: "255",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create Last Logins table
    await queryRunner.createTable(
      new Table({
        name: "last_logins",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "ip",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_last_logins_user_id",
            columnNames: ["user_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Otps table
    await queryRunner.createTable(
      new Table({
        name: "otps",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "code",
            type: "varchar",
            length: "30",
          },
          {
            name: "intention",
            type: "tinyint",
            isNullable: true,
          },
          {
            name: "status",
            type: "boolean",
            default: true,
          },
          {
            name: "token",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "tx_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_otps_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_otps_code",
            columnNames: ["code"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Password Reset Tokens table
    await queryRunner.createTable(
      new Table({
        name: "password_reset_tokens",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "status",
            type: "boolean",
          },
          {
            name: "token",
            type: "varchar",
          },
          {
            name: "ip",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_password_reset_tokens_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_password_reset_tokens_token",
            columnNames: ["token"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Distributors table
    await queryRunner.createTable(
      new Table({
        name: "distributors",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "user_name",
            type: "varchar",
            length: "150",
          },
          {
            name: "user_email",
            type: "varchar",
            length: "200",
          },
          {
            name: "user_phone_no",
            type: "varchar",
            length: "15",
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "surcharge",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "recon_type",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "vendor_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create Distributor Authentication table
    await queryRunner.createTable(
      new Table({
        name: "distributor_authentication",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "distributor_id",
            type: "int",
          },
          {
            name: "key",
            type: "varchar",
          },
          {
            name: "algorithm",
            type: "varchar",
          },
          {
            name: "domain_name",
            type: "varchar",
          },
          {
            name: "ip_address",
            type: "varchar",
          },
          {
            name: "whitelisted",
            type: "tinyint",
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "redirect_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cancel_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "auth_token",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cc_avenue_merchant_key",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cc_avenue_access_code",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "api_access_token",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "retailer_flag",
            type: "tinyint",
            default: 0,
          },
          {
            name: "balance_limit",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "send_email",
            type: "boolean",
            default: false,
          },
          {
            name: "send_sms",
            type: "boolean",
            default: false,
          },
          {
            name: "is_exchange",
            type: "boolean",
            default: false,
          },
          {
            name: "is_uuid",
            type: "boolean",
            default: false,
          },
          {
            name: "is_identity_no",
            type: "boolean",
            default: false,
          },
          {
            name: "is_pan_no",
            type: "boolean",
            default: false,
          },
          {
            name: "is_identity_link",
            type: "boolean",
            default: false,
          },
          {
            name: "is_pan_link",
            type: "boolean",
            default: false,
          },
          {
            name: "is_identity",
            type: "boolean",
            default: false,
          },
          {
            name: "is_pan",
            type: "boolean",
            default: false,
          },
          {
            name: "is_pg",
            type: "boolean",
            default: false,
          },
          {
            name: "is_settlement",
            type: "boolean",
            default: false,
          },
          {
            name: "is_chain",
            type: "boolean",
            default: false,
          },
          {
            name: "is_buy_exchange",
            type: "boolean",
            default: false,
          },
          {
            name: "is_sell_exchange",
            type: "boolean",
            default: false,
          },
          {
            name: "send_report",
            type: "boolean",
            default: false,
          },
          {
            name: "identity_kyc_limit",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "pan_kyc_limit",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "order_timeout",
            type: "int",
            default: 10,
          },
          {
            name: "sip_timeout",
            type: "int",
            default: 7,
          },
          {
            name: "callback_url",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "offer_status",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_distributor_authentication_distributor_id",
            columnNames: ["distributor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["distributor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Distributor Surcharge Rates table
    await queryRunner.createTable(
      new Table({
        name: "distributor_surcharge_rates",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "distributor_id",
            type: "int",
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_distributor_surcharge_rates_distributor_id",
            columnNames: ["distributor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["distributor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Vendor Users table
    await queryRunner.createTable(
      new Table({
        name: "vendor_users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "merchant_id",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_vendor_users_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_vendor_users_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Vendor Merchants table
    await queryRunner.createTable(
      new Table({
        name: "vendor_merchants",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "merchant_id",
            type: "varchar",
          },
          {
            name: "pincode",
            type: "int",
          },
          {
            name: "lang_preference",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_vendor_merchants_vendor_id",
            columnNames: ["vendor_id"],
          },
          {
            name: "IDX_vendor_merchants_merchant_id",
            columnNames: ["merchant_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gold Products table
    await queryRunner.createTable(
      new Table({
        name: "gold_products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "label",
            type: "varchar",
          },
          {
            name: "quantity",
            type: "int",
            default: 0,
          },
          {
            name: "dp",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "selling_price",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "purity",
            type: "decimal",
            precision: 5,
            scale: 2,
            default: 0,
          },
          {
            name: "weight",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "sku_number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "images",
            type: "text",
            isNullable: true,
          },
          {
            name: "videos",
            type: "text",
            isNullable: true,
          },
          {
            name: "brand",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "metal_weight",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "metal_stamp",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "product_thickness",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "product_dimensions",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "video",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "product_highlights",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "refund_policy",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "packaging",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "certification",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "dispatch_days",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "metal",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "minting_cost",
            type: "decimal",
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          {
            name: "is_deliverable",
            type: "boolean",
            default: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create Product Serial Numbers table
    await queryRunner.createTable(
      new Table({
        name: "product_serial_numbers",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "product_id",
            type: "int",
          },
          {
            name: "serial_number",
            type: "varchar",
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_product_serial_numbers_product_id",
            columnNames: ["product_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["product_id"],
            referencedTableName: "gold_products",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Vendor Product Charges table
    await queryRunner.createTable(
      new Table({
        name: "vendor_product_charges",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "product_id",
            type: "int",
            default: 0,
          },
          {
            name: "vendor_id",
            type: "int",
            default: 0,
          },
          {
            name: "delivery_minting_charge",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "offer_status",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_vendor_product_charges_product_id",
            columnNames: ["product_id"],
          },
          {
            name: "IDX_vendor_product_charges_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["product_id"],
            referencedTableName: "gold_products",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gold Reserves table
    await queryRunner.createTable(
      new Table({
        name: "gold_reserves",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "deficit",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "alert_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "product_id",
            type: "int",
          },
          {
            name: "vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "total_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "sellable_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "customer_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "sellable_deficit_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "customer_deficit_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_gold_reserves_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_gold_reserves_product_id",
            columnNames: ["product_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["product_id"],
            referencedTableName: "gold_products",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gold Reserve Logs table
    await queryRunner.createTable(
      new Table({
        name: "gold_reserve_logs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "amount",
            type: "int",
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "product_id",
            type: "int",
          },
          {
            name: "quantity",
            type: "int",
          },
          {
            name: "purity",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "invoice",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "transit_status",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_gold_reserve_logs_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_gold_reserve_logs_product_id",
            columnNames: ["product_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["product_id"],
            referencedTableName: "gold_products",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Daily Reserve Logs table
    await queryRunner.createTable(
      new Table({
        name: "daily_reserve_logs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "deficit",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "total_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "sellable_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "customer_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "redeem_transit_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "sellable_deficit_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "customer_deficit_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create Transit Gold Products table
    await queryRunner.createTable(
      new Table({
        name: "transit_gold_products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "label",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "weight",
            type: "decimal",
            precision: 10,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "quantity",
            type: "int",
            isNullable: true,
          },
          {
            name: "purity",
            type: "decimal",
            precision: 10,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "product_id",
            type: "int",
            default: 0,
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create Transit Gold Reserves table
    await queryRunner.createTable(
      new Table({
        name: "transit_gold_reserves",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "total_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "sellable_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "customer_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_transit_gold_reserves_user_id",
            columnNames: ["user_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Transit Gold Reserve Logs table
    await queryRunner.createTable(
      new Table({
        name: "transit_gold_reserve_logs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "amount",
            type: "int",
          },
          {
            name: "rate",
            type: "decimal",
            precision: 10,
            scale: 4,
          },
          {
            name: "purity",
            type: "decimal",
            precision: 10,
            scale: 4,
          },
          {
            name: "product_id",
            type: "int",
          },
          {
            name: "quantity",
            type: "int",
          },
          {
            name: "invoice",
            type: "varchar",
          },
          {
            name: "transit_status",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_transit_gold_reserve_logs_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_transit_gold_reserve_logs_product_id",
            columnNames: ["product_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["product_id"],
            referencedTableName: "gold_products",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Transaction Gold Reserve Logs table
    await queryRunner.createTable(
      new Table({
        name: "transaction_gold_reserve_logs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "tx_id",
            type: "int",
          },
          {
            name: "total_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "sellable_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "customer_vault_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "sellable_deficit_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "customer_deficit_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
            isNullable: true,
          },
          {
            name: "is_refund",
            type: "tinyint",
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_transaction_gold_reserve_logs_tx_id",
            columnNames: ["tx_id"],
          },
        ],
      }),
      true
    );

    // Create Transactions table
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "tx_id",
            type: "int",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "type",
            type: "tinyint",
          },
          {
            name: "callback_url",
            type: "varchar",
            length: "1000",
            isNullable: true,
          },
          {
            name: "wallet_balance",
            type: "decimal",
            precision: 10,
            scale: 4,
            isNullable: true,
          },
          {
            name: "source_id",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "card_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "card_type",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "pg_percentage",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "uuid",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "ex",
            type: "boolean",
            default: false,
          },
          {
            name: "transaction_source",
            type: "boolean",
            default: false,
          },
          {
            name: "partner_recon_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_transactions_tx_id",
            columnNames: ["tx_id"],
          },
          {
            name: "IDX_transactions_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_transactions_uuid",
            columnNames: ["uuid"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Buy Transactions table
    await queryRunner.createTable(
      new Table({
        name: "buy_transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 2,
          },
          {
            name: "buy_price",
            type: "decimal",
            precision: 15,
            scale: 2,
          },
          {
            name: "tax_percent",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "payment_mode",
            type: "tinyint",
            default: 0,
          },
          {
            name: "realization_status",
            type: "boolean",
            default: false,
          },
          {
            name: "callback_url",
            type: "varchar",
            length: "1000",
          },
          {
            name: "price_id",
            type: "int",
          },
          {
            name: "final_buy_price",
            type: "decimal",
            precision: 15,
            scale: 2,
          },
          {
            name: "pg_fees",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "gst_amt",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "settled_amt",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "tds_fees",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "invoice_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_gift",
            type: "tinyint",
            default: 0,
          },
          {
            name: "gift_filename",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "gift_comment",
            type: "text",
            isNullable: true,
          },
          {
            name: "settlement_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "payment_status",
            type: "boolean",
            default: false,
          },
          {
            name: "additional_fees",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_buy_transactions_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_buy_transactions_vendor_id",
            columnNames: ["vendor_id"],
          },
          {
            name: "IDX_buy_transactions_price_id",
            columnNames: ["price_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Sell Transactions table
    await queryRunner.createTable(
      new Table({
        name: "sell_transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "sell_price",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "tax_percent",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "settled_status",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "callback_url",
            type: "varchar",
            length: "1000",
          },
          {
            name: "price_id",
            type: "int",
          },
          {
            name: "tds_fees",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "invoice_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "settlement_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_sell_transactions_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_sell_transactions_vendor_id",
            columnNames: ["vendor_id"],
          },
          {
            name: "IDX_sell_transactions_price_id",
            columnNames: ["price_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Sell TX Infos table
    await queryRunner.createTable(
      new Table({
        name: "sell_tx_infos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "account_no",
            type: "varchar",
          },
          {
            name: "account_type",
            type: "varchar",
          },
          {
            name: "ifsc_code",
            type: "varchar",
          },
          {
            name: "bank_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "tx_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_sell_tx_infos_tx_id",
            columnNames: ["tx_id"],
          },
        ],
      }),
      true
    );

    // Create Redeem Transactions table
    await queryRunner.createTable(
      new Table({
        name: "redeem_transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "product_id",
            type: "int",
          },
          {
            name: "product_type",
            type: "tinyint",
          },
          {
            name: "minting_charge",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "weight",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "payment_mode",
            type: "tinyint",
            default: 0,
          },
          {
            name: "realization_status",
            type: "boolean",
            default: false,
          },
          {
            name: "delivery_status",
            type: "tinyint",
            default: 1,
          },
          {
            name: "serial_number",
            type: "varchar",
          },
          {
            name: "airway_number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "pg_fees",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "gst_amt",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "settled_amt",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "tds_fees",
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: "invoice_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "settlement_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "payment_status",
            type: "boolean",
            default: false,
          },
          {
            name: "additional_fees",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_redeem_transactions_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_redeem_transactions_vendor_id",
            columnNames: ["vendor_id"],
          },
          {
            name: "IDX_redeem_transactions_product_id",
            columnNames: ["product_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["product_id"],
            referencedTableName: "gold_products",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create SIP Transactions table
    await queryRunner.createTable(
      new Table({
        name: "sip_transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "buy_price",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "tax_percent",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "status",
            type: "boolean",
            default: false,
          },
          {
            name: "payment_mode",
            type: "boolean",
            default: false,
          },
          {
            name: "realization_status",
            type: "boolean",
            default: false,
          },
          {
            name: "callback_url",
            type: "varchar",
            length: "1000",
            isNullable: true,
          },
          {
            name: "price_id",
            type: "int",
            default: 0,
          },
          {
            name: "final_buy_price",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "pg_fees",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "gst_amt",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "settled_amt",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "settlement_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "invoice_id",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "tds_fees",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "is_gift",
            type: "boolean",
            default: false,
          },
          {
            name: "gift_filename",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "gift_comment",
            type: "text",
            isNullable: true,
          },
          {
            name: "payment_status",
            type: "boolean",
            default: false,
          },
          {
            name: "additional_fees",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_sip_transactions_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_sip_transactions_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gifting Transactions table
    await queryRunner.createTable(
      new Table({
        name: "gifting_transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "sender_id",
            type: "int",
          },
          {
            name: "receiver_id",
            type: "bigint",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "buy_price",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "final_buy_price",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "tax_percent",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "invoice_id",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_gifting_transactions_sender_id",
            columnNames: ["sender_id"],
          },
          {
            name: "IDX_gifting_transactions_receiver_id",
            columnNames: ["receiver_id"],
          },
          {
            name: "IDX_gifting_transactions_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["sender_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gifting Transaction Logs table
    await queryRunner.createTable(
      new Table({
        name: "gifting_transaction_logs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "tx_id",
            type: "int",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "sender_balance",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "receiver_balance",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_gifting_transaction_logs_tx_id",
            columnNames: ["tx_id"],
          },
        ],
      }),
      true
    );

    // Create Jeweller Stores table
    await queryRunner.createTable(
      new Table({
        name: "jeweller_stores",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "email",
            type: "varchar",
            length: "150",
          },
          {
            name: "phone_no",
            type: "varchar",
            length: "20",
          },
          {
            name: "pincode",
            type: "int",
          },
          {
            name: "status",
            type: "tinyint",
            default: 0,
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "store_code",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "image_url",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_jeweller_stores_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Jeweller Transactions table
    await queryRunner.createTable(
      new Table({
        name: "jeweller_transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "store_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "amount",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 2,
          },
          {
            name: "buy_price",
            type: "decimal",
            precision: 15,
            scale: 2,
          },
          {
            name: "final_buy_price",
            type: "decimal",
            precision: 15,
            scale: 2,
          },
          {
            name: "status",
            type: "tinyint",
          },
          {
            name: "purity",
            type: "varchar",
            length: "15",
          },
          {
            name: "custom_field_1",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "custom_field_2",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "jeweller_user_id",
            type: "int",
            default: 0,
          },
          {
            name: "purity_based_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "custom_field_3",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "custom_field_4",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "total_gold_value",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_jeweller_transactions_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_jeweller_transactions_vendor_id",
            columnNames: ["vendor_id"],
          },
          {
            name: "IDX_jeweller_transactions_store_id",
            columnNames: ["store_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["store_id"],
            referencedTableName: "jeweller_stores",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
      true
    );

    // Create Jeweller Topup Wallets table
    await queryRunner.createTable(
      new Table({
        name: "jeweller_topup_wallets",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "vendor_id",
            type: "int",
            default: 0,
          },
          {
            name: "gold_balance",
            type: "decimal",
            precision: 10,
            scale: 4,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_jeweller_topup_wallets_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gold Wallet table
    await queryRunner.createTable(
      new Table({
        name: "gold_wallet",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "gold_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "gold_price",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create Wallets table
    await queryRunner.createTable(
      new Table({
        name: "wallets",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "vendor_id",
            type: "int",
          },
          {
            name: "balance",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_wallets_user_id",
            columnNames: ["user_id"],
          },
          {
            name: "IDX_wallets_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gold Prices table
    await queryRunner.createTable(
      new Table({
        name: "gold_prices",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "status",
            type: "tinyint",
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_gold_prices_user_id",
            columnNames: ["user_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gold Sell Prices table
    await queryRunner.createTable(
      new Table({
        name: "gold_sell_prices",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "rate",
            type: "decimal",
            precision: 15,
            scale: 4,
          },
          {
            name: "status",
            type: "tinyint",
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_gold_sell_prices_user_id",
            columnNames: ["user_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create Gold Rate Logs table
    await queryRunner.createTable(
      new Table({
        name: "gold_rate_logs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "gst_buy_price",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "buy_price",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "sell_price",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "gold_costing",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "gold_vendor",
            type: "int",
          },
          {
            name: "am",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "pm",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "purity",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "margin",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "fx_rate",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create Sell Orders table
    await queryRunner.createTable(
      new Table({
        name: "sell_orders",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "gold_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "sell_rate",
            type: "decimal",
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: "remaining_amount",
            type: "decimal",
            precision: 15,
            scale: 4,
            default: 0,
          },
          {
            name: "vendor_id",
            type: "int",
            default: 0,
          },
          {
            name: "status",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        indices: [
          {
            name: "IDX_sell_orders_vendor_id",
            columnNames: ["vendor_id"],
          },
        ],
        foreignKeys: [
          {
            columnNames: ["vendor_id"],
            referencedTableName: "distributors",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Create PNL Logs table
    await query ["user_id"],
          