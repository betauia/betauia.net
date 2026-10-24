{
  description = "Dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs supportedSystems (system:
        let pkgs = import nixpkgs { inherit system; };
        in f pkgs system
      );
    in
    {
      devShells = forAllSystems (pkgs: system: {
        default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_24
            pkgs.pnpm_12
            pkgs.python313
            pkgs.uv
          ];

          shellHook = ''
            echo "🚀 Hei sjef! Hva skal det være i dag?"
            echo "System: ${system}"
            echo "Node version: $(node -v)"
          '';
        };
      });
    };
}

