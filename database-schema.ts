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
            columnNames: